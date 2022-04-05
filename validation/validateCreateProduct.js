export default function validateCreateProduct(values) {
    const errors = {}

    if (!values.name) {
        errors.name = 'El nombre es requerido'
    }

    if (!values.enterprise) {
        errors.enterprise = 'La empresa es requerida'
    }

    if (!values.image) {
        errors.image = 'La imagen es requerida'
    }

    if (!values.url) {
        errors.url = 'La url es requerida'
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = 'La url no es válida'
    }

    if (!values.description) {
        errors.description = 'La descripción es requerida'
    }

    return errors
}
