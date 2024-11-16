

const deleteEmptyProps = (obj: any): any  => {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null && value !== "" && value !== undefined)
    )
}

export default deleteEmptyProps;