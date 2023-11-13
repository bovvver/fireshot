import { ProfileStatsWrapper } from "./ProfileStats.styles";
import ProfileStat from "@components/atoms/ProfileStat/ProfileStat";
import ProfileStatLink from "@components/atoms/ProfileStatLink/ProfileStatLink";
import { useModals } from "@hooks/contextHooks";

const ProfileStats = () => {
  const { handleModalOpening } = useModals();

  const openFollowersModal = () => {
    handleModalOpening(true, "Followers");
  };

  const openFollowingModal = () => {
    handleModalOpening(true, "Following");
  };

  return (
    <ProfileStatsWrapper>
      <ProfileStat counter={12} title="Posts" />

      <ProfileStatLink
        counter={1265}
        title="Followers"
        onClick={openFollowersModal}
      />

      <ProfileStatLink
        counter={11}
        title="Following"
        onClick={openFollowingModal}
      />
    </ProfileStatsWrapper>
  );
};

export default ProfileStats;
