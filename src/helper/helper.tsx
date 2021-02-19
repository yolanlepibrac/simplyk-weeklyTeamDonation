import { LastDonor, TeamDonor } from "../api/api"


export const getTeamDonorFromLastDonor = (lastDonor :LastDonor, teamDonors:TeamDonor[] | null) => {
    return teamDonors?.find((user) => {
       return user.id === lastDonor.teamDonorId
    })
}