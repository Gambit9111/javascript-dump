import ContentHeader from "./ContentHeader";
import EmailList from "./EmailList";
import EmailDetails from "./EmailDetails";

export default function Main() {
  return (
    <main className="flex flex-col w-full bg-dark-600 h-full">
      <ContentHeader />
      <div className="flex flex-row" style={{ height: "calc(100% - 84px)" }}>
        <EmailList />
        <EmailDetails />
      </div>
    </main>
  )
}