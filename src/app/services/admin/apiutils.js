export const get_access_token = async () => {
  //   const data = JSON.parse(sessionStorage.getItem(LOGGED_ADMIN));
  const data = await AsyncStorage.getItem('Token');
  console.log('token', data);

  const access_token = data.token;
  if (access_token) {
    const token = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    return token;
  } else {
    return undefined;
  }
};
