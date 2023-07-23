import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin, setTravelTimeInformation } from "../slices/navSlice";

//Navigation
import MapViewDirections from "react-native-maps-directions"
//@ts-ignore
import { GOOGLE_MAPS_API_KEY } from "@env"
import { Colors } from "../constants/colors"
import { useEffect, useRef } from "react"

const Map = () => {
	const origin = useSelector(selectOrigin)
	const destination = useSelector(selectDestination)
	const mapRef = useRef(null)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!origin || !destination) {
			return
		}
		// for being sure the map is zoomed out from the begining
		mapRef.current.fitToSuppliedMarkers(["origin", "destination"])
	}, [origin, destination])

	useEffect(() => {
		if (origin && destination) {
			(async () => {
				const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.description}&destination=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`

				try {					
					await fetch(url)
						.then((res: any) => res.json())
						.then((data: any) => {
							// console.log("duration: ", JSON.stringify(data.routes[0].legs[0].duration));
							const element = {
								distance: data.routes[0].legs[0].distance,
								duration: data.routes[0].legs[0].duration,
								end_address: data.routes[0].legs[0].end_address,
								end_location: data.routes[0].legs[0].end_location,
								start_address: data.routes[0].legs[0].start_address,
								start_location: data.routes[0].legs[0].start_location 
							} 
	
							dispatch(
								setTravelTimeInformation(element)
							)
						})
				} catch (error) {
					console.log(error)
				}

			})()
		}
	}, [origin, destination])

	return (
		<View className="flex-1">
			{origin ? (
				<MapView
					ref={mapRef}
					className="flex-1"
					provider="google"
					initialRegion={{
						latitude: origin.location.lat,
						latitudeDelta: 0.005,
						longitude: origin.location.lng,
						longitudeDelta: 0.005,
					}}
					followsUserLocation={true}
					mapType="mutedStandard">
					{destination && (
						<MapViewDirections
							origin={origin.description}
							destination={destination.description}
							apikey={GOOGLE_MAPS_API_KEY}
							strokeColor={Colors.neutral_950}
							strokeWidth={3}
						/>
					)}

					{/* origin */}
					<Marker
						coordinate={{
							latitude: origin.location.lat,
							longitude: origin.location.lng,
						}}
						title="Origin"
						description={origin.description}
						identifier="origin"
						pinColor="yellow"
					/>

					{destination && (
						<Marker
							coordinate={{
								latitude: destination.location.lat,
								longitude: destination.location.lng,
							}}
							title="Destination"
							description={destination.description}
							identifier="destination"
						/>
					)}
				</MapView>
			) : (
				<View>
					<Text>No origin selected</Text>
				</View>
			)}
		</View>
	)
}

// //////////////////////////////////////////////////////////////
const data = {
	geocoded_waypoints: [
		{
			geocoder_status: "OK",
			place_id: "ChIJyVEFHPqPi0cRujQFYoEWeEI",
			types: ["political", "sublocality", "sublocality_level_1"],
		},
		{
			geocoder_status: "OK",
			place_id: "ChIJdfpIotuRi0cRYJW65CqrCAQ",
			types: ["locality", "political"],
		},
	],
	routes: [
		{
			bounds: {
				northeast: { lat: 45.9060085, lng: 6.1785852 },
				southwest: { lat: 45.8815226, lng: 6.1276211 },
			},
			copyrights: "Map data ©2023 Google",
			legs: [
				{
					distance: { text: "6.0 km", value: 5987 },
					duration: { text: "13 mins", value: 756 },
					end_address: "74290 Veyrier-du-Lac, France",
					end_location: { lat: 45.8817344, lng: 6.1781435 },
					start_address: "Annecy, France",
					start_location: { lat: 45.8995495, lng: 6.1293757 },
					steps: [
						{
							distance: { text: "65 m", value: 65 },
							duration: { text: "1 min", value: 16 },
							end_location: { lat: 45.8995325, lng: 6.1285322 },
							html_instructions:
								'Head <b>west</b> on <b>Espl. de l\'Hôtel de ville</b> toward <b>Quai Eustache Chappuis</b>/<wbr/><b>D1508</b><div style="font-size:0.9em">Partial restricted usage road</div>',
							polyline: { points: "ewcwGscld@?`A@lA@X" },
							start_location: { lat: 45.8995495, lng: 6.1293757 },
							travel_mode: "DRIVING",
						},
						{
							distance: { text: "0.3 km", value: 319 },
							duration: { text: "1 min", value: 80 },
							end_location: { lat: 45.9015803, lng: 6.1291432 },
							html_instructions:
								'Turn <b>right</b> onto <b>Quai Eustache Chappuis</b>/<wbr/><b>D1508</b><div style="font-size:0.9em">Continue to follow Quai Eustache Chappuis</div>',
							maneuver: "turn-right",
							polyline: {
								points: "awcwGi~kd@sBbAg@ZOHMHwA|@SBI?ICEEEGGICIEKOw@q@eE",
							},
							start_location: { lat: 45.8995325, lng: 6.1285322 },
							travel_mode: "DRIVING",
						},
						{
							distance: { text: "2.4 km", value: 2359 },
							duration: { text: "5 mins", value: 322 },
							end_location: { lat: 45.9055253, lng: 6.1582466 },
							html_instructions:
								'Continue onto <b>Av. d\'Albigny</b>/<wbr/><b>D909</b><div style="font-size:0.9em">Continue to follow D909</div>',
							polyline: {
								points:
									"{cdwGcbld@Ia@o@wDs@{DEUUmAESIQCS{A{I}AwIQaACKAIyBoMSuA_@yBYeBSaACOQcACUw@{EMy@Ky@CQCOE]AQ?S?A?]?Y@]?YJyADWd@gCBQH_@D]Dk@?KBa@BY@[@[@o@?}@As@Ce@OkBAQ_A}LAYIgAAQIgAC_@C]CUE[OoBIw@S_CgA{NU_D?A?A?A?A?A?AA??A?A?AA??A@M@S?Q@YBWBYDW?ADYBU?EF[D[FYFWFWFUDUFQFU",
							},
							start_location: { lat: 45.9015803, lng: 6.1291432 },
							travel_mode: "DRIVING",
						},
						{
							distance: { text: "3.2 km", value: 3197 },
							duration: { text: "5 mins", value: 328 },
							end_location: { lat: 45.8815226, lng: 6.1785852 },
							html_instructions:
								"At the roundabout, take the <b>1st</b> exit onto <b>Av. de Chavoires</b>/<wbr/><b>D909</b> heading to <b>Thônes les Aravis</b>/<wbr/><b>Veyrier du Lac</b>",
							maneuver: "roundabout-right",
							polyline: {
								points:
									"q|dwGaxqd@@?@??A@??A@??A?A@??A?A@??A?A?AN_@BCHMHMRWLQ@Al@u@DEVWRQLIFGHEZQXOTIBATGzAe@zC{@FCx@Yt@Y`@Qv@e@ZQ`@U`@QTIPEPG|@UHCFGdBe@BARELERGZKTKXOVORKXUPM@CTSVWHKJMRS@AFIPU@ANUTYFGDGBCV]FIRWNQHMp@aABCZa@^i@R[Za@zB_DdBgCX[LGd@i@TY`@e@t@cAXa@?APSN]\\g@RWRSJKFEHIJGLG`@S`A_@LEd@M`@Kd@ODCDCNI@A|@i@RQVYDCBGBCJSL]J[p@wCDMBEDKLWXc@j@}@^e@v@eATYV_@@Cr@aAVYNSFGJI@Al@a@`@U?A^SVONMJGFKVY\\YPMPKNEPGn@OZGb@G?@?@?@@@?@?@@@@@?@@@@@@??@@?@??@@?@?@?@?@?@?@A@?@A@A@A?A@??A@A?A@A?A?A?A@A?A?A?A?A?A?A?A?AAAf@E`@Kh@Ob@SHGTOd@e@n@m@x@y@NQj@m@TMLIPOVYDCPQ@??@@?@?@??A@?@??A@??A@??A@??A?A@??A?A?A?A?A?AJOb@e@j@w@NSNQd@g@f@m@VWDETQZQRMROh@]VMJEJALALC\\Md@SZDVATA^K`@QNMJI@C",
							},
							start_location: { lat: 45.9055253, lng: 6.1582466 },
							travel_mode: "DRIVING",
						},
						{
							distance: { text: "47 m", value: 47 },
							duration: { text: "1 min", value: 10 },
							end_location: { lat: 45.8817344, lng: 6.1781435 },
							html_instructions:
								'Turn <b>right</b><div style="font-size:0.9em">Destination will be on the left</div>',
							maneuver: "turn-right",
							polyline: { points: "of`wGewud@A`@ANEJADABA@ABC@C@A?IDC@" },
							start_location: { lat: 45.8815226, lng: 6.1785852 },
							travel_mode: "DRIVING",
						},
					],
					traffic_speed_entry: [],
					via_waypoint: [],
				},
			],
			overview_polyline: {
				points:
					"ewcwGscld@@nC@XsBbAw@d@eBfA]BOIMQIU{BwMuAsHMe@yDsTqCgPaBwJUsA{@qFa@uCGo@?U@oBPqBh@yCN}@Dw@JsB@mBEyAsAuQw@aK}BaZ@y@NcBHw@\\iB\\uAJWDIPe@j@w@bAoA`A{@d@Wn@YpGkB`A]vAk@rAw@bAg@vBm@PKhBg@pA_@zAw@bA{@`AeA\\c@jBcCzDoF`FgHf@c@z@cAvAiBj@w@N]\\g@f@k@h@c@n@[nAe@fAYj@StAy@t@w@NWXy@v@eDHQf@{@jAcBfBcCjA{AV[LKnAw@fAs@hAgAb@Y`@MjAWb@E@DDJFDH?HEHWAMf@EjA[l@[z@u@dDgDb@Wh@i@XU@@B?BADG@I?Cn@u@z@kAtB_CZWn@_@|@m@b@SXCj@Qd@SZDl@C`A]ZW@CA`@GZGNWJ",
			},
			summary: "D909",
			warnings: [],
			waypoint_order: [],
		},
	],
	status: "OK",
};

export default Map;
