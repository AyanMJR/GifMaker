import classNames from 'classnames';
import styles from './index.module.scss';

const Button = ({
  children,
  isActive = false,
  classes,
  ...props
}) => {
  return (
    <button className={classNames(styles.btn, classes, { [styles.isActive]: isActive })} {...props}>{children}</button>
  )
}

export default Button;