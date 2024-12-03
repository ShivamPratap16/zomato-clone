import { createPortal } from 'react-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../../../Redux/Reducer/Auth/Auth.action';

import gLogo from '/images/google.png';
import closeBtn from '/images/closeBtn.jpg';

import signupCss from './Signup.module.css';

let Signup = ({ setAuth }) => {
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const googlesignin = () => {
        window.location.href = 'http://localhost:4000/auth/google';
    };

    const handleSubmit = async () => {
        try {
            dispatch(signUp(userData));

            setUserData({
                fullname: '',
                email: '',
                password: '',
            });

            alert('Account created successfully!');
            setAuth({ closed: true, login: false, signup: false });
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Something went wrong!');
        }
    };

    const loginDiv = (
        <div className={signupCss.outerDiv}>
            <div className={signupCss.modal}>
                <div className={signupCss.header}>
                    <span className={signupCss.ttl}>Signup</span>
                    <span
                        className={signupCss.closeBtn}
                        onClick={() => setAuth({ closed: true, login: false, signup: false })}
                    >
                        <img className={signupCss.closeBtnImg} src={closeBtn} alt="close button" />
                    </span>
                </div>
                <div className={signupCss.lgBox}>
                    <input
                        className={signupCss.inpBox}
                        type="text"
                        name="fullname"
                        placeholder="Full Name ..."
                        value={userData.fullname}
                        onChange={handleChange}
                    />
                    <input
                        className={signupCss.inpBox}
                        type="email"
                        name="email"
                        placeholder="Email ..."
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <input
                        className={signupCss.inpBox}
                        type="password"
                        name="password"
                        placeholder="Password ..."
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <span className={signupCss.termsTxt}>
                        <input
                            type="checkbox"
                            name="accept"
                            id="accept"
                            className={signupCss.checkBox}
                        />
                        <span>
                            I agree to Zomato's{' '}
                            <a href="" className={signupCss.termaAnchor}>
                                Terms of Service, Privacy Policy
                            </a>{' '}
                            and{' '}
                            <a href="" className={signupCss.termaAnchor}>
                                Content Policies
                            </a>
                        </span>
                    </span>
                    <button className={signupCss.btn} onClick={handleSubmit}>
                        Create Account
                    </button>
                </div>
                <div className={signupCss.orBreak}>
                    <span className={signupCss.orBreakText}>or</span>
                </div>
                <div className={signupCss.socialSignupBox}>
                    <a href="http://localhost:4000/auth/google" className={signupCss.socialSignupLink}>
                        <img className={signupCss.icon} src={gLogo} alt="google login" />
                        Continue with Google
                    </a>
                </div>
                <hr className={signupCss.break} />
                <div className={signupCss.newToZomato}>
                    Already have an account?{' '}
                    <div
                        className={signupCss.createAcc}
                        onClick={() => setAuth({ closed: false, login: true, signup: false })}
                    >
                        Log in
                    </div>
                </div>
                {error && <div className={signupCss.error}>{error}</div>}
            </div>
        </div>
    );

    return createPortal(loginDiv, document.getElementById('modal'));
};

export default Signup;
