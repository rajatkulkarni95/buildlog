interface IHeaderProps {
  children: React.ReactNode;
  classes?: string;
}

const Header = ({ children, classes }: IHeaderProps) => {
  return (
    <header
      className={`p-4 min-h-[64px] flex bg-transparent border-b border-zinc-300 dark:border-zinc-700 ${classes}`}
    >
      {children}
    </header>
  );
};

export default Header;
