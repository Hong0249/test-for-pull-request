let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("vms").collection("visitor")
	}

	static async Register(name, ic_no, email, hp, mysj_status) {
		// TODO: Check name, email exists
        let result = await conn.db('vms').collection('visitor').find(
            {email: email}).toArray();
        if(result.length > 0){
            return false;
        }

		// TODO: Save new user to database
        let result2 = await conn.db('vms').collection('visitor').insertOne({
            name: name,
            ic_no: ic_no,
            email: email,
            hp: hp,
            mysj_status: mysj_status
        });
	}

	static async BookingandReservation(facilities_id, visitor_id, time_slot) {
		// TODO: Check if current booking is full
        let result = await conn.db('vms').collection('booking_request').find(
            {facilities_id: facilities_id, time_slot: time_slot}).countDocuments();

        let facilities = await conn.db('vms').collection('facilities').find(
            {facilities_id: facilities_id}).toArray();
        if(result >= facilities.max_num_of_visitor){
            return false;
        }

        // TODO: Check if duplicate booking
        let result2 = await conn.db('vms').collection('booking_request').find(
            {facilities_id: facilities_id, time_slot: time_slot, visitor_id: visitor_id}).toArray();
        if(result2.length > 0){
            return false;
        }

		// TODO: Save booking request to database
        await conn.db('vms').collection('booking_request').insertOne({
            facilities_id: facilities_id,
            visitor_id: visitor_id,
            time_slot: time_slot
        });
	}

	static async Facilities_info(facilities_name) {
		// TODO: Query facilities_name
        let result = await conn.db('vms').collection('facilities').find(
            {facilities_name: facilities_name}).toArray();
        if(result.length > 0){
            return result;
        }
    }
}

module.exports = User;