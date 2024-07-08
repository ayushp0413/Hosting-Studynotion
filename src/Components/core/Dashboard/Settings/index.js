import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import UpdatePassward from "./UpdatePassward"
import EditProfile from "./EditProfile"

export default function Settings () {
    
    return (
        <>
        <div className='flex flex-col  gap-y-14 mt-12 mb-12 ml-8'>

            <h1 className='text-3xl text-richblack-5'>Edit Profile</h1>

            {/* section 1 */}
            <ChangeProfilePicture/>

            {/* section 2 */}
            <EditProfile/>

            {/* section -3 */}
            <UpdatePassward/>

            {/* section -4 */}
            <DeleteAccount/>

        </div>


        </>

    )
}