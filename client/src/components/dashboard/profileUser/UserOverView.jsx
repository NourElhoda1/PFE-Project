import React, { useEffect, useState } from "react";

function UserOverview() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const profileData = localStorage.getItem("profile");
    if (profileData) {
      setProfile(JSON.parse(profileData));
    }
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Profile Overview</h2>
      <p><strong>First Name:</strong> {profile.first_name}</p>
      <p><strong>Last Name:</strong> {profile.last_name}</p>
      <p><strong>User Name:</strong> {profile.user_name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      {/* Add other profile fields as necessary */}
    </div>
  );
}

export default UserOverview;
