#pragma strict

public var x_accel : float;
public var y_accel : float;
public var max_velocity : float;
public var deadZone : float;
public var vArrow : arrowController;
public var axArrow : arrowController;
public var ayArrow : arrowController;
public var engine : AudioSource;

function Start () {

}

function FixedUpdate () {
	rigidbody.velocity += Vector3(x_accel, y_accel, 0) * Time.deltaTime;
	rigidbody.velocity = Vector3.ClampMagnitude(rigidbody.velocity, max_velocity);
	
	if (x_accel == 0 && Mathf.Abs(rigidbody.velocity.x) < deadZone) {
		rigidbody.velocity.x = 0;
	}
	if (y_accel == 0 && Mathf.Abs(rigidbody.velocity.y) < deadZone) {
		rigidbody.velocity.y = 0;
	}
	
	transform.rotation.eulerAngles.z = Mathf.Atan2(rigidbody.velocity.y, rigidbody.velocity.x) * Mathf.Rad2Deg;
	
	vArrow.pointVector = Vector2(rigidbody.velocity.x, rigidbody.velocity.y) * 0.5;
	axArrow.pointVector = Vector2(x_accel, 0 ) * 0.5;
	ayArrow.pointVector = Vector2(0, y_accel) *0.5;
	
	var accVec = new Vector2(x_accel, y_accel);
	
	engine.volume = Mathf.Max(Mathf.Min(1, Mathf.Lerp(engine.volume, accVec.magnitude, Time.deltaTime * 3)), 0);
	engine.pitch = Mathf.Max(Mathf.Min(3, Mathf.Lerp(engine.volume, accVec.magnitude, Time.deltaTime * 3)), 0);
}

