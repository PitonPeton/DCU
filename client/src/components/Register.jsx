import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const history = useNavigate();
    useEffect(() => {
        const checkLogin = async () => {
            let val = await axios.get("http://localhost:4000/login");
            if (val.data.user) {
                history('/')
            }
        }
        checkLogin();
    }, [])
    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        tel: '',
        password: '',
        confirmPassword: '',
    });

    const [msg, setMsg] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    axios.defaults.withCredentials = true;

    const onSub = async (e) => {
        e.preventDefault();
        // Verificar si las contraseñas coinciden antes de enviar el formulario
        if (user.password !== user.confirmPassword) {
            setPasswordMatchError(true);
            return;
        } else {
            const { confirmPassword, ...userDataWithoutConfirmPassword } = user;

            try {
                const response = await axios.post("http://localhost:4000/register", userDataWithoutConfirmPassword);

                if (response.data.msg) {
                    setMsg(response.data.msg);
                } else {
                    history("/login");
                }
            } catch (error) {
                console.error("Error while registering:", error);
            }
        }
    };

    const userInput = (event) => {
        const { name, value } = event.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
            {msg ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">ERROR!</strong>
                    <span className="block sm:inline"> {msg}</span>
                </div>
            ) : null}
            <br />
            <form onSubmit={onSub}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Full name
                    </label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="name"
                        value={user.name}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="email"
                        value={user.email}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Username
                    </label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                        name="username"
                        value={user.username}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Phone number
                    </label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="tel"
                        value={user.tel}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                        name="password"
                        value={user.password}
                        onChange={userInput}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordMatchError ? 'border-red-500' : ''
                            }`}

                        name="confirmPassword"
                        onChange={userInput}

                        required
                    />
                    {passwordMatchError && (
                        <p className="text-red-500 text-xs italic">Passwords do not match.</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Register;
