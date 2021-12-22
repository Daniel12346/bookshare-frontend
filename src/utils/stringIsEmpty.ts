export const stringIsEmpty = (s: string) => {
    for (let e of s) {
        if (e !== "" && e !== " ")
            return false;
    }
    return true;
};
