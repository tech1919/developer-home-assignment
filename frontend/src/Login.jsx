import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errorList, setErrorList] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/users/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                const statusCode = data['status_code'];

                if (statusCode === 200) {
                    const accessToken = data['data']['access_token'];
                    sessionStorage.setItem('access_token', accessToken);
                    window.location.href = '/tasks';
                } else {
                    var errorDict = data['data']
                    var errorList = [];

                    for (var i in errorDict) {
                        console.log("Start")
                        val = errorDict[i];
                        if (typeof val === 'string' || val instanceof String) {
                            errorList.push(val);

                        } else {
                            var val = i.charAt(0).toUpperCase() + i.slice(1) + ": " + errorDict[i];
                            errorList.push(val);
                        }
                    }

                    console.log(errorList);
                    setErrorList(errorList);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mb-3">
                            Log In
                        </button>
                    </form>
                    <Link to="/register" className="btn btn-secondary btn-block mb-3">Don't have an account yet? Register here</Link>


                    {errorList.length > 0 && (
                        <div className="alert alert-danger" role="alert">
                            <ul>
                            {errorList.map((error) => (<li key={error}>{error}</li>))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}

export default Login;
