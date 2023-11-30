export default class ModalProps {
  isModalOpenParam: boolean;
  title: string;

  constructor(
    isModalOpenParam: boolean,
    title: string
  ) {
    this.isModalOpenParam = isModalOpenParam;
    this.title = title;
  }
}
