<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */

    public function a_user_can_search_for_other_users()
    {
        $this->withoutExceptionHandling();

        $user = $this->signIn();

        $res = $this->json('GET','/users')->assertStatus(200)
            ->assertJson(['success' => true]);
        $this->assertIsArray($res['data']);
    }

    /** @test */
    public function a_user_can_search_via_email()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        factory(User::class)->create(['email' => 'johndoe@gmail.com']);
        factory(User::class)->create(['email' => 'johdoe@gmail.com']);
        factory(User::class)->create(['email' => 'joeoe@gmail.com']);
        factory(User::class)->create(['email' => 'joe@gmail.com']);
        $res = $this->json('GET', '/users', [
            'email' => 'joh'
        ])->assertStatus(200);
        $emails = array_column($res['data'], 'email');
        $this->assertContains('johndoe@gmail.com', $emails);
        $this->assertContains('johdoe@gmail.com', $emails);
    }
}
