import { ProfileStatsWrapper } from "./ProfileStats.styles";
import ProfileStat from "@components/atoms/ProfileStat/ProfileStat";
import ProfileStatLink from "@components/atoms/ProfileStatLink/ProfileStatLink";
import { ProfileStatsProps } from "@customTypes/componentProps";
import { useModals } from "@hooks/contextHooks";

const ProfileStats = ({ posts, followers, following }: ProfileStatsProps) => {
  const { handleModalOpening } = useModals();

  const openFollowersModal = () => {
    handleModalOpening(true, "Followers");
  };

  const openFollowingModal = () => {
    handleModalOpening(true, "Following");
  };

  return (
    <ProfileStatsWrapper>
      <ProfileStat counter={posts} title="Posts" />

      <ProfileStatLink
        counter={followers}
        title="Followers"
        onClick={openFollowersModal}
      />

      <ProfileStatLink
        counter={following}
        title="Following"
        onClick={openFollowingModal}
      />
    </ProfileStatsWrapper>
  );
};

export default ProfileStats;
