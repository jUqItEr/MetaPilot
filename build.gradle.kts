import com.github.gradle.node.npm.task.NpmTask

plugins {
    java
    id("org.springframework.boot") version "2.7.17"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
    id("com.github.node-gradle.node") version "7.0.1"
}

group = "com.dita"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.springframework.boot:spring-boot-starter-aop")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.mybatis.spring.boot:mybatis-spring-boot-starter:3.0.0")
    implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity5")
    implementation("org.springdoc:springdoc-openapi-ui:1.6.6")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    implementation("com.auth0:java-jwt:3.10.3")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")
    compileOnly("org.projectlombok:lombok")
    runtimeOnly("com.mysql:mysql-connector-j")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.mybatis.spring.boot:mybatis-spring-boot-starter-test:3.0.0")
    testImplementation("org.springframework.security:spring-security-test")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.bootBuildImage {
    builder = "paketobuildpacks/builder-jammy-base:latest"
}

/**
 * NPM Install Start
 */
node {
    download = true
    version = "20.9.0"
    npmVersion = "10.2.3"
    // Set the work directory for unpacking node
    workDir = file("${project.buildDir}/nodejs")
    // Set the work directory for NPM
    npmWorkDir = file("${project.buildDir}/npm")
}

tasks.register<NpmTask>("appNpmInstall") {
    description = "Installs all dependencies from package.json"
    workingDir = file("${project.projectDir}/src/main/resources/static")
    args = listOf("install")
}

tasks.register<NpmTask>("appNpmBuild") {
    dependsOn("appNpmInstall")
    description = "Builds project"
    workingDir = file("${project.projectDir}/src/main/resources/static")
    args = listOf("run", "build")
}

tasks.register<NpmTask>("appNpmDev") {
    dependsOn("appNpmBuild")
    description = "Run project"
    workingDir = file("${project.projectDir}/src/main/resources/static")
    args = listOf("run", "dev")
}

tasks.register<Copy>("copyWebApp") {
    dependsOn("appNpmBuild")
    description = "Copies built project to where it will be served"
    from("src/main/resources/static/build")
    into("build/resources/main/static/.")
}

tasks.withType<JavaCompile> {
    // So that all the tasks run with ./gradlew build
    dependsOn("copyWebApp")
}
/**
 * NPM Install End
 */