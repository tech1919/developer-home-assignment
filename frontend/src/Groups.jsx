import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Groups.css';  // You can create a separate CSS file for styling groups if needed.
import AppNavbar from './AppNavbar';

function Group({ group, onDelete }) {
    return (
        <div className="list-group-item d-flex justify-content-between align-items-center">
            <span style={{ backgroundColor: group.color, padding: '10px', color: 'black' }}>{group.title}</span>
            <Button variant="danger" onClick={() => onDelete(group)}>Delete</Button>
        </div>
    );
}

function CreateGroupModal({ show, onHide, onGroupCreate }) {
    const [newGroup, setNewGroup] = useState({ title: '', color: '' });

    const handleSubmit = () => {
        onGroupCreate(newGroup);
        setNewGroup({ title: '', color: '' });
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={newGroup.title} onChange={(e) => setNewGroup({ ...newGroup, title: e.target.value })} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Color</Form.Label>
                    <Form.Control type="color" value={newGroup.color} onChange={(e) => setNewGroup({ ...newGroup, color: e.target.value })} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Create Group</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [showCreateGroup, setShowCreateGroup] = useState(false);
    const accessToken = sessionStorage.getItem('access_token');

    const apiHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
    };

    useEffect(() => { fetchGroups() }, []);

    const fetchGroups = () => {
        fetch("/api/groups/", { headers: apiHeaders })
            .then(res => res.json())
            .then(data => {
                setGroups(data.data)
            });
    }

    const handleDeleteGroup = (group) => {
        fetch(`/api/groups/${group.id}`, {
            method: 'DELETE',
            headers: apiHeaders
        })
            .then(res => res.json())
            .then(data => setGroups(data.data));
    }

    const handleCreateGroup = (newGroup) => {
        fetch('/api/groups/', {
            method: 'POST',
            headers: apiHeaders,
            body: JSON.stringify(newGroup)
        })
            .then(res => res.json())
            .then(data => {
                setShowCreateGroup(false);
                setGroups(data.data);
            });
    }

    if (sessionStorage['access_token'] === undefined) {
        window.location.href = '/';
    }

    return (
        <div className='group-page bg-light'>
            <AppNavbar />
            <div className="container mt-5 border rounded bg-white p-4">
                <h2 className="text-center mb-4">Groups</h2>
                <div className="list-group">
                    {groups != null && groups.length > 0 && groups.map(group => (
                        <Group
                            key={group.id}
                            group={group}
                            onDelete={handleDeleteGroup}
                        />
                    ))}
                </div>
                <Button className="mt-3" variant="primary" onClick={() => setShowCreateGroup(true)}>Create Group</Button>
            </div>
            <CreateGroupModal
                show={showCreateGroup}
                onHide={() => setShowCreateGroup(false)}
                onGroupCreate={handleCreateGroup}
            />
        </div>
    );
}
