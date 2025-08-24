import type { User } from '@ts-interfaces';

export const UserItem: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="window user-item max-w-[200px] overflow-hidden">
      <div className="title-bar inactive">
        <div className="title-bar-text">{user.name}</div>
      </div>
      <div className="window-body max-w-[200px] overflow-hidden">
        <p>
          Age: <span className="font-bold">{user.age}</span>
        </p>
        <p>
          Email: <span className="font-bold">{user.email}</span>
        </p>
        <p>
          Password: <span className="font-bold">{user.password}</span>
        </p>
        <p>
          Gender: <span className="font-bold">{user.gender}</span>
        </p>
        <p>
          Terms and Conditions:{' '}
          <span className="font-bold">{user.areTermsAccepted ? 'accepted' : 'not accepted'}</span>
        </p>
        <p>Image:</p>
        <img width={30} src={user.image} alt={user.name} />
        <p>
          Country: <span className="font-bold">{user.country}</span>
        </p>
      </div>
    </div>
  );
};
