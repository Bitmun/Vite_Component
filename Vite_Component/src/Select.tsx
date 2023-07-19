import { useEffect, useState } from "react"
import styles from "./select.module.css"

type SelectOption = {
  label: string
  value: string | number
}

type SelectProps = {
  options: SelectOption[]
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export function Select( {value, onChange, options}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function selectOption(option: SelectOption) {
    if (option !== value) onChange(option)
  }

  function clearOption() {
    onChange(undefined)
  }

  function isOptionSelected(option: SelectOption) {
    return option === value
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])
  

  return (
    <>
      <div onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(!isOpen)} tabIndex={0} className={styles.container}>
        <span className={styles.value}>{value?.label}</span>
        <button onClick={e => {
          e.stopPropagation()
          clearOption()
        }} className={styles["clear-btn"]}>&times;</button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li
              onClick={e => {
               e.stopPropagation()
               selectOption(option)
               setIsOpen(false)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`${styles.option}
               ${isOptionSelected(option) ? styles.selected : ""}
               ${index === highlightedIndex ? styles.highlighted : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
    )
}