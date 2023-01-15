export const firstWordName = (name) => {
    return name.split(" ")[0];
}

export const generateCode = () => {
    let code = Math.floor(Math.random() * (999 - 1) + 1);
    return String(code).padStart(3, '0')
}