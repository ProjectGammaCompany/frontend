export const HomePage = () => {
  return (
    <div>
      <h1>Домашняя страница</h1>
      <button
        onClick={() => {
          console.log("logout");
        }}
      >
        Выйти
      </button>
    </div>
  );
};
