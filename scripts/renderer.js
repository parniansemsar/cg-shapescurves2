class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d', {willReadFrequently: true});
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(framebuffer);
                break;
            case 1:
                this.drawSlide1(framebuffer);
                break;
            case 2:
                this.drawSlide2(framebuffer);
                break;
            case 3:
                this.drawSlide3(framebuffer);
                break;
        }

        this.ctx.putImageData(framebuffer, 0, 0);
    }

    // framebuffer:  canvas ctx image data
    drawSlide0(framebuffer) {
        // TODO: draw at least 2 Bezier curves
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        // Curve 1: arch
        let p0 = {x: 100, y: 150};
        let p1 = {x: 150, y: 500};
        let p2 = {x: 350, y: 480};
        let p3 = {x: 380, y: 200};
        this.drawBezierCurve(p0, p1, p2, p3, this.num_curve_sections, [255, 0, 0, 255], framebuffer);

        // Curve 2: S-curve
        let p4 = {x: 450, y: 120};
        let p5 = {x: 750, y: 180};
        let p6 = {x: 420, y: 480};
        let p7 = {x: 720, y: 520};
        this.drawBezierCurve(p4, p5, p6, p7, this.num_curve_sections, [0, 0, 255, 255], framebuffer);
    
        
        
        // Following line is example of drawing a single line
        // (this should be removed after you implement the curve)
        // this.drawLine({x: 100, y: 100}, {x: 600, y: 300}, [255, 0, 0, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide1(framebuffer) {
        // TODO: draw at least 2 circles
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let center1 = {x: 220, y: 300};
        let center2 = {x: 550, y: 300};
        this.drawCircle(center1, 150, this.num_curve_sections, [255, 0, 0, 255], framebuffer);
        this.drawCircle(center2, 90, this.num_curve_sections, [0, 0, 255, 255], framebuffer);
        
    }

    // framebuffer:  canvas ctx image data
    drawSlide2(framebuffer) {
        // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        // Polygon 1: 5 vertices (in counter-clockwise order)
        let pentagon = [
            {x: 100, y: 150},
            {x: 300, y: 100},
            {x: 360, y: 280},
            {x: 230, y: 430},
            {x:  80, y: 330}
        ];
        this.drawConvexPolygon(pentagon, [255, 0, 0, 255], framebuffer);

        // Polygon 2: 7 vertices (in counter-clockwise order)
        let heptagon = [
            {x: 470, y: 120},
            {x: 610, y:  90},
            {x: 720, y: 190},
            {x: 730, y: 340},
            {x: 640, y: 470},
            {x: 500, y: 450},
            {x: 430, y: 280}
        ];
        this.drawConvexPolygon(heptagon, [0, 128, 128, 255], framebuffer);
        
        // Following lines are example of drawing a single triangle
        // (this should be removed after you implement the polygon)
        // let point_a = {x:  80, y:  40};
        // let point_b = {x: 320, y: 160};
        // let point_c = {x: 240, y: 360};
        // this.drawTriangle(point_a, point_c, point_b, [0, 128, 128, 255], framebuffer);
    }

    // framebuffer:  canvas ctx image data
    drawSlide3(framebuffer) {
        // TODO: draw your name!
        //   - variable `this.num_curve_sections` should be used for `num_edges`
        //   - variable `this.show_points` should be used to determine whether or not to render vertices
        let red    = [255,   0,   0, 255];
        let orange = [255, 140,   0, 255];
        let blue   = [  0,   0, 255, 255];
        let teal   = [  0, 128, 128, 255];
        let purple = [128,   0, 128, 255];

        // P: straight line (stem) + Bezier curve (bowl)
        this.drawLine({x: 80, y: 220}, {x: 80, y: 400}, red, framebuffer);
        this.drawBezierCurve({x: 80, y: 400}, {x: 185, y: 405}, {x: 185, y: 295}, {x: 80, y: 300},
                             this.num_curve_sections, red, framebuffer);

        // a: circle + straight line
        this.drawCircle({x: 215, y: 265}, 42, this.num_curve_sections, orange, framebuffer);
        this.drawLine({x: 257, y: 220}, {x: 257, y: 310}, orange, framebuffer);

        // r: straight line + Bezier curve
        this.drawLine({x: 295, y: 220}, {x: 295, y: 330}, blue, framebuffer);
        this.drawBezierCurve({x: 295, y: 290}, {x: 300, y: 335}, {x: 330, y: 340}, {x: 355, y: 322},
                             this.num_curve_sections, blue, framebuffer);

        // n: straight line + Bezier curve + straight line
        this.drawLine({x: 380, y: 220}, {x: 380, y: 330}, teal, framebuffer);
        this.drawBezierCurve({x: 380, y: 290}, {x: 385, y: 348}, {x: 450, y: 348}, {x: 450, y: 290},
                             this.num_curve_sections, teal, framebuffer);
        this.drawLine({x: 450, y: 290}, {x: 450, y: 220}, teal, framebuffer);

        // i: filled convex polygon (body) + circle (dot)
        let i_body = [
            {x: 480, y: 220},
            {x: 500, y: 220},
            {x: 500, y: 320},
            {x: 480, y: 320}
        ];
        this.drawConvexPolygon(i_body, purple, framebuffer);
        this.drawCircle({x: 490, y: 352}, 12, this.num_curve_sections, purple, framebuffer);

        // a: circle + straight line
        this.drawCircle({x: 565, y: 265}, 42, this.num_curve_sections, orange, framebuffer);
        this.drawLine({x: 607, y: 220}, {x: 607, y: 310}, orange, framebuffer);

        // n: straight line + Bezier curve + straight line
        this.drawLine({x: 640, y: 220}, {x: 640, y: 330}, red, framebuffer);
        this.drawBezierCurve({x: 640, y: 290}, {x: 645, y: 348}, {x: 710, y: 348}, {x: 710, y: 290},
                             this.num_curve_sections, red, framebuffer);
        this.drawLine({x: 710, y: 290}, {x: 710, y: 220}, red, framebuffer);
        
    }

    // p0:           object {x: __, y: __}
    // p1:           object {x: __, y: __}
    // p2:           object {x: __, y: __}
    // p3:           object {x: __, y: __}
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a Bezier curve
        // Start at t = 0.0 (the first endpoint)
        let prev = {x: p0.x, y: p0.y};

        for (let i = 1; i <= num_edges; i++) {
            let t = i / num_edges;

            // Parametric equations for a Bezier curve
            let x = Math.pow(1 - t, 3) * p0.x +
                    3 * Math.pow(1 - t, 2) * t * p1.x +
                    3 * (1 - t) * Math.pow(t, 2) * p2.x +
                    Math.pow(t, 3) * p3.x;
            let y = Math.pow(1 - t, 3) * p0.y +
                    3 * Math.pow(1 - t, 2) * t * p1.y +
                    3 * (1 - t) * Math.pow(t, 2) * p2.y +
                    Math.pow(t, 3) * p3.y;
            // Line drawing only works with integer pixel coordinates
            let next = {x: Math.round(x), y: Math.round(y)};

            this.drawLine(prev, next, color, framebuffer);

            if (this.show_points) {
                this.drawVertex(prev, [0, 0, 0, 255], framebuffer);
            }
            prev = next;
        }

        if (this.show_points) {
            // Last point on the curve
            this.drawVertex(prev, [0, 0, 0, 255], framebuffer);
            // Control points drawn in a different color
            this.drawVertex(p1, [255, 0, 255, 255], framebuffer);
            this.drawVertex(p2, [255, 0, 255, 255], framebuffer);
        }
        
    }

    // center:       object {x: __, y: __}
    // radius:       int
    // num_edges:    int
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawCircle(center, radius, num_edges, color, framebuffer) {
        // TODO: draw a sequence of straight lines to approximate a circle
        // Start at angle 0 (positive x direction)
        let prev = {x: center.x + radius, y: center.y};

        for (let i = 1; i <= num_edges; i++) {
            let phi = (2 * Math.PI * i) / num_edges;

            // Convert polar coordinates to Cartesian coordinates
            let x = center.x + radius * Math.cos(phi);
            let y = center.y + radius * Math.sin(phi);
            // Line drawing only works with integer pixel coordinates
            let next = {x: Math.round(x), y: Math.round(y)};

            this.drawLine(prev, next, color, framebuffer);

            if (this.show_points) {
                this.drawVertex(prev, [0, 0, 0, 255], framebuffer);
            }
            prev = next;
        }
        
    }
    
    // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawConvexPolygon(vertex_list, color, framebuffer) {
        // TODO: draw a sequence of triangles to form a convex polygon
        let v0 = vertex_list[0];
        for (let i = 1; i < vertex_list.length - 1; i++) {
            this.drawTriangle(v0, vertex_list[i], vertex_list[i + 1], color, framebuffer);
        }

        if (this.show_points) {
            for (let i = 0; i < vertex_list.length; i++) {
                this.drawVertex(vertex_list[i], [0, 0, 0, 255], framebuffer);
            }
        }
        
    }
    
    // v:            object {x: __, y: __}
    // color:        array of int [R, G, B, A]
    // framebuffer:  canvas ctx image data
    drawVertex(v, color, framebuffer) {
        // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
        // Small filled square (7x7 pixels) centered at v, made of horizontal lines
        let size = 3;
        for (let y = v.y - size; y <= v.y + size; y++) {
            this.drawLine({x: v.x - size, y: y}, {x: v.x + size, y: y}, color, framebuffer);
        }
        
    }
    
    /***************************************************************
     ***       Basic Line and Triangle Drawing Routines          ***
     ***       (code provided from in-class activities)          ***
     ***************************************************************/
    pixelIndex(x, y, framebuffer) {
	    return 4 * y * framebuffer.width + 4 * x;
    }
    
    setFramebufferColor(color, x, y, framebuffer) {
	    let p_idx = this.pixelIndex(x, y, framebuffer);
        for (let i = 0; i < 4; i++) {
            framebuffer.data[p_idx + i] = color[i];
        }
    }
    
    swapPoints(a, b) {
        let tmp = {x: a.x, y: a.y};
        a.x = b.x;
        a.y = b.y;
        b.x = tmp.x;
        b.y = tmp.y;
    }

    drawLine(p0, p1, color, framebuffer) {
        if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) { // |m| <= 1
            if (p0.x < p1.x) {
                this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
        else {                                                // |m| > 1
            if (p0.y < p1.y) {
                this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
            }
            else {
                this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
            }
        }
    }
    
    drawLineLow(x0, y0, x1, y1, color, framebuffer) {
        let A = y1 - y0;
        let B = x0 - x1;
        let iy = 1; // y increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            iy = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let y = y0;
        for (let x = x0; x <= x1; x++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                y += iy;
            }
        }
    }
    
    drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
        let A = x1 - x0;
        let B = y0 - y1;
        let ix = 1; // x increment (+1 for positive slope, -1 for negative slop)
        if (A < 0) {
            ix = -1;
            A *= -1;
        }
        let D = 2 * A + B;
        let D0 = 2 * A;
        let D1 = 2 * A + 2 * B;
    
        let x = x0;
        for (let y = y0; y <= y1; y++) {
            this.setFramebufferColor(color, x, y, framebuffer);
            if (D <= 0) {
                D += D0;
            }
            else {
                D += D1;
                x += ix;
            }
        }
    }
    
    drawTriangle(p0, p1, p2, color, framebuffer) {
        // Deep copy, then sort points in ascending y order
        p0 = {x: p0.x, y: p0.y};
        p1 = {x: p1.x, y: p1.y};
        p2 = {x: p2.x, y: p2.y};
        if (p1.y < p0.y) this.swapPoints(p0, p1);
        if (p2.y < p0.y) this.swapPoints(p0, p2);
        if (p2.y < p1.y) this.swapPoints(p1, p2);
        
        // Edge coherence triangle algorithm
        // Create initial edge table
        let edge_table = [
            {x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y)}, // edge01
            {x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y)}, // edge02
            {x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y)}  // edge12
        ];
        
        // Do cross product to determine if pt1 is to the right/left of edge02
        let v01 = {x: p1.x - p0.x, y: p1.y - p0.y};
        let v02 = {x: p2.x - p0.x, y: p2.y - p0.y};
        let p1_right = ((v01.x * v02.y) - (v01.y * v02.x)) >= 0;
        
        // Get the left and right edges from the edge table (lower half of triangle)
        let left_edge, right_edge;
        if (p1_right) {
            left_edge = edge_table[1];
            right_edge = edge_table[0];
        }
        else {
            left_edge = edge_table[0];
            right_edge = edge_table[1];
        }
        // Draw horizontal lines (lower half of triangle)
        for (let y = p0.y; y < p1.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) { 
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
        
        // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
        if (p1_right) {
            right_edge = edge_table[2];
        }
        else {
            left_edge = edge_table[2];
        }
        // Draw horizontal lines (upper half of triangle)
        for (let y = p1.y; y < p2.y; y++) {
            let left_x = parseInt(left_edge.x) + 1;
            let right_x = parseInt(right_edge.x);
            if (left_x <= right_x) {
                this.drawLine({x: left_x, y: y}, {x: right_x, y: y}, color, framebuffer);
            }
            left_edge.x += left_edge.inv_slope;
            right_edge.x += right_edge.inv_slope;
        }
    }
};

export { Renderer };
