import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import Input from 'src/components/Input';
import logo from 'src/assets/logo.webp';
import Button from 'src/components/Button';
import styles from './index.module.scss';

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username } = formData;
    localStorage.setItem('username', username);
    localStorage.setItem('isLoggedIn', true);
    navigate('/app')
  }

  return (
    <div className='d-flex flex-direction-column align-items-center'>
      <div className={classNames('d-flex justify-content-center', styles.logoContainer)}>
        <img className={''} src={logo}  />
      </div>
      <div className={classNames('d-flex justify-content-center', styles.loginForm)}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <Input label="Username" name="username" value={formData.name} onChange={handleChange} required />
          </div>
          <div className={styles.inputContainer}>
            <Input label="Password" name="password" value={formData.password} onChange={handleChange} type="password" required />
          </div>
          <div className={styles.inputContainer}>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;