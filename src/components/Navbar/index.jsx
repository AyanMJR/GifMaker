import Logo from 'src/assets/logo.webp';
import styles from './index.module.scss';
import classNames from 'classnames';

const Navbar = () => {
  const username = localStorage.getItem('username')
  return (
    <header className={classNames('d-flex justify-content-between', styles.header)}>
      <div className={styles.logoContainer}>
        <img src={Logo} />
      </div>
      <div>
        <span className={styles.userInfo}>{username.charAt(0).toUpperCase()}</span>
      </div>
    </header>
  )
}

export default Navbar;