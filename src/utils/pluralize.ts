export const pluralize = (count: number, str: string, plural?: string) => {
  if (plural) {
    let replyText
    if (count === 1) {
      replyText = str
    } else {
      replyText = plural
    }
    return `${count} ${replyText}`
  }

  return `${count} ${str}${count === 1 ? '' : 's'}`
}
