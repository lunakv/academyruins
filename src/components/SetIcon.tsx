interface Props {
  setCode: string;
}

const SetIcon = ({ setCode }: Props) => <i className={`ss ss-${setCode.toLowerCase()}`} />;

export default SetIcon;
