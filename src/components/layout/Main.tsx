interface IMainFrameProps {
  children: React.ReactNode;
}

const MainFrame = ({ children }: IMainFrameProps) => {
  return (
    <main className="h-screen w-full overflow-hidden bg-white dark:bg-zinc-900 flex flex-col border border-zinc-300 dark:border-zinc-700">
      {children}
    </main>
  );
};

export default MainFrame;
