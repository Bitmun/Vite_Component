import { useEffect, useState } from "react"
import styles from "./select.module.css"

export type SelectOption = {
  label: string
  value: string | number
}

type SingleSelectProps = {
  multiple?: false
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

type MultipleSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)

export function Select( {multiple, value, onChange, options}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(el => el !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  function clearOption() {
    multiple ? onChange([]) : onChange(undefined)
  }

  function isOptionSelected(option: SelectOption) {
    return multiple ? value.includes(option) :  option === value
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])
  

  return (
    <>
      <div onBlur={() => setIsOpen(false)} onClick={() => setIsOpen(!isOpen)} tabIndex={0} className={styles.container}>
        <span className={styles.value}>{multiple ? value.map(v => (
          <button key={v.value} 
          onClick={e => {
            e.stopPropagation()
            selectOption(v)
          }}
          className={styles["option-badge"]}
          >
            {v.label}
            <span className={styles["remove-btn"]}>&times;</span>
          </button>
        )) : value?.label}</span>
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