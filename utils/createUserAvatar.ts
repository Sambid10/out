export const createUserAvatar = (uid: string) => {
  return `https://api.dicebear.com/7.x/thumbs/png?seed=${uid}`
}