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
      <div className="mb-4 flex flex-col space-y-2 ">
      <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
      <p><strong>Username:</strong> {profile.user_name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
      </div>
    </div>
  );
}

export default UserOverview;
