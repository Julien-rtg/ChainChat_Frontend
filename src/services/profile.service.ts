import axios from 'axios';

const API_URL = 'http://localhost:3005';

interface ProfileResponse {
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  
  // Add other profile fields as needed
}

class ProfileService {
  async getProfileEmail(): Promise<ProfileResponse> {
    try {
      const response = await axios.post(`${API_URL}/profile/email`, 
        { email: 'john.doe@example.com' },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch profile email');
      }
      throw error;
    }
  }
}

export const profileService = new ProfileService();