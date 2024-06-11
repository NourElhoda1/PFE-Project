import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


// Component for displaying individual profile
function AdherentProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/v1/profiles/${id}`);
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{profile.first_name} {profile.last_name}</h2>
      {/* Display other profile details here */}
    </div>
  );
}

export default AdherentProfile;


