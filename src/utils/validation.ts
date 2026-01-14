// Simulate async username availability check
export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Simulate taken usernames (in real app, this would be an API call)
  const takenUsernames = ['admin', 'test', 'user', 'demo'];
  
  return !takenUsernames.includes(username.toLowerCase());
};
