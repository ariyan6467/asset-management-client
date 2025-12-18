import React, { useState, useRef, useEffect } from "react";
import UseAuth from "../../../hook/UseAuth";

const MyProfile = () => {
  const { user } = UseAuth();
  console.log(user);

  // Ensure user and user.displayName are defined before splitting
  const nameParts = user?.displayName ? user.displayName.split(" ") : ["", ""];

  // To get "Nahian" (first name)
  const firstName = nameParts[0];

  // To get "Jawad" (second name)
  const secondName = nameParts[1];

  const [User, setUser] = useState({
    firstName: firstName,
    lastName: secondName,
    email: user?.email || "", // fallback if email is undefined
    bio: "Senior Software Engineer with a passion for building intuitive user experiences and scalable web applications.",
    profilePic: user?.photoURL || "", // fallback if photoURL is undefined
    companies: [
      "TechCorp Solutions",
      "Innovate Global",
      "OpenSource Foundation",
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profilePic: imageUrl }));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Decorative Header */}
        <div style={styles.headerBanner}></div>

        {/* Profile Image Section */}
        <div style={styles.profileHeader}>
          <div style={styles.avatarWrapper}>
            <img src={User.profilePic} alt="Profile" style={styles.avatar} />
            {isEditing && (
              <div
                style={styles.uploadOverlay}
                onClick={() => fileInputRef.current.click()}
              >
                <span>Change</span>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
            accept="image/*"
          />
          <h2 style={styles.userName}>
            {User.firstName} {User.lastName}
          </h2>
          <p style={styles.userEmail}>{User.email}</p>
        </div>

        <div style={styles.content}>
          {/* Form Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Details</h3>
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <input
                  style={isEditing ? styles.input : styles.inputDisabled}
                  name="firstName"
                  value={User.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <input
                  style={isEditing ? styles.input : styles.inputDisabled}
                  name="lastName"
                  value={User.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>About Me</label>
              <textarea
                style={
                  isEditing
                    ? { ...styles.input, ...styles.textarea }
                    : { ...styles.inputDisabled, ...styles.textarea }
                }
                name="bio"
                value={User.bio}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Affiliations Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Affiliations</h3>
            <div style={styles.chipContainer}>
              {User.companies.map((company, index) => (
                <span key={index} style={styles.chip}>
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div style={styles.footer}>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                style={styles.saveBtn}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f2f5",
    fontFamily: '"Inter", -apple-system, sans-serif',
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "550px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  headerBanner: {
    height: "120px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "-60px",
    paddingBottom: "20px",
    borderBottom: "1px solid #f0f0f0",
  },
  avatarWrapper: {
    position: "relative",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "5px solid white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    cursor: "pointer",
    backgroundColor: "#fff",
  },
  avatar: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  uploadOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
  },
  userName: { margin: "15px 0 5px 0", fontSize: "24px", color: "#1a202c" },
  userEmail: { margin: 0, color: "#718096", fontSize: "14px" },
  content: { padding: "30px" },
  section: { marginBottom: "25px" },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "15px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "15px",
  },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "13px", fontWeight: "500", color: "#718096" },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    outline: "none",
    transition: "border 0.2s",
  },
  inputDisabled: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid transparent",
    backgroundColor: "#f8fafc",
    color: "#4a5568",
    fontSize: "14px",
  },
  textarea: { minHeight: "80px", resize: "vertical" },
  chipContainer: { display: "flex", flexWrap: "wrap", gap: "8px" },
  chip: {
    padding: "6px 14px",
    backgroundColor: "#ebf4ff",
    color: "#3182ce",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
  },
  footer: { display: "flex", justifyContent: "flex-end", marginTop: "10px" },
  editBtn: {
    padding: "10px 24px",
    backgroundColor: "#4a5568",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  saveBtn: {
    padding: "10px 24px",
    backgroundColor: "#48bb78",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default MyProfile;
