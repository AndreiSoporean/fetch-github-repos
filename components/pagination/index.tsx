import { Repository } from "../../pages"
import styles from '../../styles/RepositoryCard.module.css'

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
      <button onClick={handlePrev} disabled={!hasPrev}><span>Prev</span></button>
      <span>{`${value} / ${Math.round(total / perPage)}`}</span>
      <button onClick={handleNext} disabled={!hasNext}><span>Next</span></button>
    </div>

  )

}

export default Pagination