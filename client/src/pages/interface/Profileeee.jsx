import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Navbar from '../../layout/Navbar/Navbar';
import { MdAlternateEmail } from 'react-icons/md';
import { getServiceBySellerId, isLoadingSelector, servicesSelector, setLoading } from '../../app/serviceSlice';
import AuthAxios from '../../helpers/request';

function Profileeee() {
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);
  const services = useSelector(servicesSelector);

  useEffect(() => {
    const profileData = Cookies.get('profile');
    if (profileData) {
      try {
        const parsedProfile = JSON.parse(profileData);
        setProfile(parsedProfile);
        console.log('Profile data:', parsedProfile);
      } catch (error) {
        console.error('Error parsing profile data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDataServices = async (adherentId) => {
      dispatch(setLoading(true));
      try {
        console.log(`Fetching services for adherent ID: ${adherentId}`);
        const response = await AuthAxios.get(`http://localhost:8000/v1/services/seller/${adherentId}`);
        console.log('Service fetch response:', response);
        if (response.status === 200) {
          dispatch(getServiceBySellerId(response.data));
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (profile && profile._id) {
      fetchDataServices(profile._id);
    } else {
      console.error('Profile ID is undefined:', profile);
    }
  }, [profile, dispatch]); // Ensure dispatch is included in the dependency array

  if (!profile || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-200 min-h-screen p-4">
        <div className="container mx-auto p-8">
          <div className="gap-4">
            {/* Profile Information Section */}
            <div className="col-span-1 bg-white p-4 shadow-lg rounded-lg border mb-4">
              <div className="flex items-center mb-10">
                <img
                  src={profile.profileImage || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="}
                  alt="Profile"
                  className="w-20 h-20 rounded-full mr-6"
                />
                <div>
                  <h1 className="text-3xl font-semibold">{profile.first_name} {profile.last_name}</h1>
                  <h3 className="text-xl font-medium">{profile.careerStatus}</h3>
                  <p className="text-gray-500 mt-2"><MdAlternateEmail className="inline-block mr-1" />{profile.email}</p>
                </div>
              </div>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg border mb-4">
              <h3 className="text-xl font-semibold">About</h3>
              <p className="mt-2">{profile.about}</p>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg border mb-4">
              <h3 className="text-xl font-semibold">Resume</h3>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2">View Resume</a>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg border mb-4">
              <h3 className="text-xl font-semibold">Skills</h3>
              <div className="flex flex-wrap mt-2">
                {profile.skills?.map(skill => (
                  <span className="bg-gray-100 rounded-full px-4 py-2 m-1 text-sm" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg border mb-4">
              <h3 className="text-xl font-semibold">Languages</h3>
              <ul className="list-disc list-inside mt-2">
                {profile.languages?.map(language => (
                  <li key={language.name}>{language.name}: {language.level}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg border mb-4">
              <h3 className="text-xl font-semibold">Education</h3>
              <ul className="list-disc list-inside mt-2">
                {profile.education?.map(edu => (
                  <li key={edu.institution}>{edu.institution} - {edu.degree}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg border mb-4">
              <h3 className="text-xl font-semibold">Experiences</h3>
              <ul className="list-disc list-inside mt-2">
                {profile.experiences?.map(exp => (
                  <li key={exp.company}>{exp.company} - {exp.role}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg border mb-4">
              <h3 className="text-xl font-semibold">Portfolio</h3>
              <ul className="list-disc list-inside mt-2">
                {profile.projects?.map(proj => (
                  <li key={proj.name}>{proj.name} - {proj.description}</li>
                ))}
              </ul>
            </div>
            <div className="col-span-1 bg-white p-4 rounded-lg shadow-lg border mb-4">
              <h3 className="text-xl font-semibold">Services</h3>
              <ul className="list-disc list-inside mt-2">
                {services.length > 0 ? (
                  services.map((service) => (
                    <li key={service.id}>
                      {service.service_name} - {service.short_description}
                    </li>
                  ))
                ) : (
                  <li>No services available</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profileeee;
