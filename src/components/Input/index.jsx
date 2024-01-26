import classNames from 'classnames';
import styles from './index.module.scss';

const Input = ({
  label,
  classes,
  ...props
}) => {
  return (
    <div className={'d-flex flex-direction-column'}>
      <label>{label}</label>
      <input className={classNames(styles.input, classes)} {...props} />
    </div>
  )
}

export default Input;