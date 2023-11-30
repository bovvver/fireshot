import { useEffect, useState } from "react";
import { Container, Box, ImageList, ImageListItem } from "@mui/material";
import ProfileHeader from "@components/molecules/ProfileHeader/ProfileHeader";
import { useParams } from "react-router-dom";
import { useAuth } from "@hooks/contextHooks";
import { executeProfileFetching } from "@api/ProfileService";
import { useToast } from "@hooks/contextHooks";
import { useNavigate } from "react-router-dom";
import { ROOT_PATH } from "@config/routes";
import { UserData } from "@customTypes/api";
import ProfileLoading from "@components/molecules/ProfileLoading/ProfileLoading";
import { baseUrl } from "@env/environments";

const Profile = () => {
  const [profileData, setProfileData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { loggedUser } = useAuth();
  const { nickname } = useParams();
  const { handleToastOpening } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await executeProfileFetching(nickname!);
        if (result && result.body) setProfileData(result.body);
        setLoading(false);
      } catch (e) {
        navigate(ROOT_PATH);
        handleToastOpening("Couldn't fetch profile data.", "info", e);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickname]);

  return (
    <>
      {!loading ? (
        <Container maxWidth="md">
          <ProfileHeader
            profileData={profileData}
            loggedUserAccount={loggedUser === nickname}
          />
          <Box>
            <ImageList sx={{ width: "100%" }} cols={3}>
              {profileData!.photos.map((item) => (
                <ImageListItem
                  key={item}
                  sx={{ width: "100%", aspectRatio: "1/1" }}
                >
                  <img
                    srcSet={`${baseUrl}/photo/${item}?fit=crop&auto=format&dpr=2 2x`}
                    src={`${baseUrl}/photo/${item}?fit=crop&auto=format`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Container>
      ) : (
        <ProfileLoading />
      )}
    </>
  );
};

export default Profile;
