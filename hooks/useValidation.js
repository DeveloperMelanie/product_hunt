import { useState, useEffect } from 'react'

export default function useValidation(initialState, validate, fn) {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitClicked, setSubmitClicked] = useState(false)

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0
            if (noErrors) {
                fn()
            }
            setIsSubmitting(false)
        }
    }, [errors])

    const handleChange = e => {
        if (e.target.name === 'image') {
            return setValues({
                ...values,
                [e.target.name]: e.target.files[0],
            })
        }
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleBlur = () => {
        if (submitClicked) {
            const errors = validate(values)
            setErrors(errors)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const errors = validate(values)
        setErrors(errors)
        setIsSubmitting(true)
        setSubmitClicked(true)
    }

    return {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
    }
}
