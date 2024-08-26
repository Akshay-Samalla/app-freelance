import Navbar from './Navbar';
import Dev from './Dev';
import Recruiter from './Recruiter';

const Hi = ({uid,role}) => {
  
  console.log(uid,role)
  return (
    <>
      <Navbar uid = {uid} role = {role}/>
      {role ==='dev' ? <Dev uid = {uid}/> : <Recruiter uid={uid }/>}
      {/* <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">Seller Gigs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div key={gig._id} className="border rounded-md p-4 shadow-sm">
              <h3 className="text-xl font-bold">{gig.title}</h3>
              <p className="mt-2">{gig.description}</p>
              <p className="mt-2 text-gray-600">Price: ${gig.price}</p>
              <p className="mt-2 text-gray-600">Rating: {gig.rating}</p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default Hi;