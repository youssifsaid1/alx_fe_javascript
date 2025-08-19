function UserProfile({ name, role, location }) {
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Location: {location}</p>
    </div>
  );
}

export default UserProfile;
