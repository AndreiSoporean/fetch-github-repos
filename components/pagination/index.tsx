import styles from '../../styles/Pagination.module.css'

interface PaginationProps {
  value: number;
  total: number;
  perPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  onChangeValue: (newValue: number) => void;
}



const Pagination = (props: PaginationProps): React.ReactElement => {
  const { value, onChangeValue, total, perPage, hasNext, hasPrev } = props;

  const handleNext = () => {
    const newValue = value + 1;
    onChangeValue(newValue)
  }

  const handlePrev = () => {
    const newValue = value - 1;
    onChangeValue(newValue)
  }

  return (
    <div>
      <button className={styles.paginationBtn} onClick={handlePrev} disabled={!hasPrev}><span>Prev</span></button>
      <span className={styles.pageCounter}>{`${value} / ${Math.round(total / perPage)}`}</span>
      <button className={styles.paginationBtn} onClick={handleNext} disabled={!hasNext}><span>Next</span></button>
    </div>

  )

}

export default Pagination