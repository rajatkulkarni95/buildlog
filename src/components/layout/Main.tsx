interface IMainFrameProps {
  children: React.ReactNode;
}

const MainFrame = ({ children }: IMainFrameProps) => {
  return (
    <main className="h-screen w-full overflow-x-hidden overflow-y-auto p-3 bg-white dark:bg-zinc-900">
      <div className="flex flex-col border h-full border-zinc-300 dark:border-zinc-700">
        {children}
      </div>
    </main>
  );
};

export default MainFrame;
