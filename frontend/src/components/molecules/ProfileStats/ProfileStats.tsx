import { ProfileStatsWrapper } from "./ProfileStats.styles";
import ProfileStat from "@components/atoms/ProfileStat/ProfileStat";
import ProfileStatLink from "@components/atoms/ProfileStatLink/ProfileStatLink";
import {
  ModalFunctionProps,
  ProfileStatsProps,
} from "@customTypes/componentProps";
import { useModals } from "@hooks/contextHooks";
import {
  executeFollowersFetch,
  executeFollowingFetch,
} from "@api/ProfileService";
import ModalProps from "./ModalProps";
import { useToast } from "@hooks/contextHooks";

const ProfileStats = ({
  posts,
  followers,
  following,
  nickname,
}: ProfileStatsProps) => {
  const { handleModalOpening, handleModalData } = useModals();
  const { handleToastOpening } = useToast();

  const followersProps = new ModalProps(
    true,
    "Followers"
  );

  const followingProps = new ModalProps(
    true,
    "Following"
  );

  const fetchModalInitialState = async (subject: ModalFunctionProps) => {
    try {
      let result: string[];

      if (subject === "followers") {
        result = await executeFollowersFetch(nickname).then(
          (res) => res.data.body!
        );
      } else if (subject === "following") {
        result = await executeFollowingFetch(nickname).then(
          (res) => res.data.body!
        );
      } else result = [];

      handleModalData(result);
    } catch (e) {
      handleToastOpening("Couldn't fetch users.", "warning", e);
    }
  };

  const openFollowersModal = () => {
    fetchModalInitialState("followers");
    handleModalOpening(followersProps);
  };

  const openFollowingModal = () => {
    fetchModalInitialState("following");
    handleModalOpening(followingProps);
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
