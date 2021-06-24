import {
  Add,
  Apps,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from '@material-ui/icons'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import SidebarOption from './SidebarOption'

function Sidebar() {
  const [channels, loading, error] = useCollection(db.collection('rooms'))
  const [user] = useAuthState(auth)
  return (
    <Container>
      <SidebarHeader>
        <SidebarInfo>
          <h2>R.V. Slack-Clone 2.0</h2>
          <h3>
            <FiberManualRecord />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>
      {/* Sidebar Option */}
        <SidebarOption Icon={InsertComment} title="Threads" />
        <SidebarOption Icon={Inbox} title="Mentions & reactions" />
        <SidebarOption Icon={Drafts} title="saved items" />
        <SidebarOption Icon={BookmarkBorder} title="Channel browser" />
        <SidebarOption Icon={PeopleAlt} title="People & user groups" />
        <SidebarOption Icon={Apps} title="Apps" />
        <SidebarOption Icon={FileCopy} title="File browser" />
        <SidebarOption Icon={ExpandLess} title="Show less" />
        <hr />
        <SidebarOption Icon={ExpandMore} title="Show more" />
        <hr />
        <SidebarOption Icon={Add} addChannelOption title="Add Channel" />
        {channels?.docs.map((doc) => (
          <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
        ))}
    </Container>
  );
}

export default Sidebar

const Container = styled.div`
  color: #fff;
  max-width: 260px;
  margin-top: 60px;
  border-top: 1px solid #49247b;
  flex: 0.3;
  background-color: var(--slack-color);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;

  hr {
    border: 1px solid #49247b;
    margin-bottom: 10px;
    margin-top: 10px;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49247b;
  padding: 13px;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--slack-color);

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49247b;
    font-size: 18px;
    background-color: white;
    border-radius: 50%;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;

    .MuiSvgIcon-root {
      font-size: 14px;
      color: green;
      margin-top: 1px;
      margin-right: 2px;
    }
  }
`

