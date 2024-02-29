const axios = require('axios');

exports.onExecutePostUserRegistration = async (event, api) => {
  try {
    const { user } = event;

    const userId = user.user_id;
    const email = user.email;

    const apiUrl = event.secrets.CORE_AUTH0_ACTIONS_API + '/api/auth/newuser';

    const { data, status } = await axios.post(
      apiUrl,
      {
        userId,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + event.secrets.AUTHORIZATION_SECRET,
        },
        validateStatus: () => true,
      },
    );

    if (status === 200) console.log(`Status: ${status} - Successfully added ${userId} to database`);
    else console.log(`Status: ${status} - Failed to add ${userId} to database`);
  } catch (error) {
    console.error('Error calling API:', error.message);
  }
};
