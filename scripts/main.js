//애니메이션 정의
var interval

//전역변수 정의
var cell
var canvas
var grp 

//메인 코드 동작부
$(document).ready(function () {
    canvas = $("#mainCanvas")[0]

    //그래프 그리기
    grp = new Graph($("#graph")[0], new Vector2(8, 0), 20)
    grp.coordinateDrawing()
    
});

function start_simul(){
    grp.refreshGraph(new Vector2(8, 0), 20)

    //캔버스 불러오기
    canvas = $("#mainCanvas")[0]

    //진폭
    var A = 3

    //강체 정의
    cell = new Rigidbody(1, 0, new Vector2(A, 0), new Vector2(0, 0))
    cell2 = new Rigidbody(1, 0, new Vector2(A, 0), new Vector2(0, 0))

    //dt 정의
    dt = Number($("#dt")[0].value)
    t = 0
    
    //애니메이션(인터벌)실행
    interval = setInterval(() => {
        //화면 사이즈 맞추기
        resizeCvs(canvas)

        var k = 10
        var r = 0

        t += dt

        //세포 가속도 변경
        cell.acceleration = cell.position.scalarmul(-k).add(cell.velocity.scalarmul(-r))

        //일반해에 따라 위치가 변하는 공
        cell2.position = new Vector2((Math.E**(-r*t/(cell2.mass*2)))*A*Math.cos(Math.sqrt(k/cell.mass)*t), 0)

        //세포 변위 새로고침
        cell.refreshPosition(dt)

        //스크린과 그림 오브젝트 정의
        scr = new Screen(canvas, new Vector2(0, 0), 40)
        drw = new Drawing(canvas, scr)
        
        //기본 좌표축 그리기
        drw.coordinateDrawing()
    
        //오차 출력
        er = cell.position.x-cell2.position.x
        console.log(er)

        //세포 그리기
        drw.Circle(Math.sqrt(cell.mass), cell.position)
        drw.Circle(Math.sqrt(cell2.mass), cell2.position)
        //그래프그리기
        grp.Circle(0.1, new Vector2(t, cell.position.x), 'red')
        grp.Circle(0.1, new Vector2(t, cell2.position.x), 'green')
        grp.Circle(0.1, new Vector2(t, cell.position.x-cell2.position.x), 'blue')

        if(t > grp.xmax){
            grp.refreshGraph(new Vector2(grp.xmax + 10, 0), 20)
        }
    }, (dt)*1000)
}

window.onmousemove = function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
}