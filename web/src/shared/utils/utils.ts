export const handleRequest = async (asyncCallback: () => Promise<void>) => {
  try {
    await asyncCallback()
  } catch (e) {
    window.alert('Request Error')
    console.log(e)
  }
}
