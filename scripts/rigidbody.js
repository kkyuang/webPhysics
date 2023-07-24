//강체 클래스

class Rigidbody{
    //생성부
    constructor(mass, charge, position, velocity){ //(질량, 전하, 위치, 속도)
        this.mass = mass
        this.charge = charge
        this.position = position
        this.velocity = velocity
        this.acceleration = new Vector2(0, 0)
    }

    //위치 새로고침 함수
    refreshPosition(dt){
        this.velocity = this.velocity.add(this.acceleration.scalarmul(dt))
        this.position = this.position.add(this.velocity.scalarmul(dt))
    }
}